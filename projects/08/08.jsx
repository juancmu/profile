import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project08() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 08</h1>
            </div>
        </div>
    )
}
