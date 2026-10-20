import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project05() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 05</h1>
            </div>
        </div>
    )
}
