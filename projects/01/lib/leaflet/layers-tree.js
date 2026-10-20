var lay = L.control.layers.tree(baseTree, overlaysTree,
    {
        namedToggle: true,
        selectorBack: false,
        closedSymbol: '&#8862; &#x1f5c0;',
        openedSymbol: '&#8863; &#x1f5c1;',
        collapseAll: 'Collapse all',
        expandAll: 'Expand all',
        collapsed: false,
    });

lay.addTo(map).collapseTree().expandSelected().collapseTree(true);
L.DomEvent.on(L.DomUtil.get('onlysel'), 'click', function() {
    lay.collapseTree(true).expandSelected(true);
});
