import { useProjectStyle } from '../../hooks/useProjectStyle'

export default function Project12() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 12</h1>
            </div>
        </div>
    )
}
