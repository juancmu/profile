import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project11() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 11</h1>
            </div>
        </div>
    )
}
