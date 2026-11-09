import urllib.request
import json
import urllib.parse
import re
import time
import os

filepath = 'c:/Users/jmuno/OneDrive - CFRO/Documentos/profile/src/pages/gispQuestions.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the JSON part
json_str = content.replace('export const QUESTIONS = ', '').strip()
if json_str.endswith(';'):
    json_str = json_str[:-1]

questions = json.loads(json_str)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def search_wikipedia_image(query):
    try:
        search_url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + urllib.parse.quote(query) + '&utf8=&format=json'
        req = urllib.request.Request(search_url, headers=headers)
        res = json.loads(urllib.request.urlopen(req).read())
        if res['query']['search']:
            title = res['query']['search'][0]['title']
            img_url = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=' + urllib.parse.quote(title)
            img_req = urllib.request.Request(img_url, headers=headers)
            img_res = json.loads(urllib.request.urlopen(img_req).read())
            pages = img_res['query']['pages']
            for page_id in pages:
                if 'original' in pages[page_id]:
                    return pages[page_id]['original']['source']
    except Exception as e:
        return None
    return None

for q in questions:
    if 'image' in q and q['image']:
        continue
        
    if q['answer'] is not None and q['answer'] < len(q['options']):
        correct_answer = q['options'][q['answer']]
        # clean up correct answer
        correct_answer = re.sub(r'\(.*?\)', '', correct_answer).strip()
        query = q['domainLabel'] + ' ' + correct_answer
        fallback_query = correct_answer
        
        query = query[:50]
        fallback_query = fallback_query[:50]
        
        img = search_wikipedia_image(query)
        if not img:
            img = search_wikipedia_image(fallback_query)
        
        if img:
            q['image'] = img
            print(f"Found image for Q{q['id']}: {img}")
        else:
            print(f"No image for Q{q['id']}")
            q['image'] = f"https://placehold.co/600x400?text=Visual+for+Q{q['id']}"
            
        time.sleep(0.5)

new_content = 'export const QUESTIONS = ' + json.dumps(questions, indent=2) + ';\n'
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Done!')
