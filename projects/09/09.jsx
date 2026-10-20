import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project09() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 09</h1>
            </div>
        </div>
    )
}
