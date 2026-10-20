import { useParams } from 'react-router-dom';

export function useProjectStyle() {
    const { id } = useParams();
    const bgImage = id ? `/projects/${id}.jpg` : '';

    return bgImage ? {
        backgroundImage: `linear-gradient(rgba(161, 165, 179, 0.85), rgba(10, 15, 30, 0.85)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '60px 0',
        borderTop: '1px solid var(--color-border)',
    } : {};
}
