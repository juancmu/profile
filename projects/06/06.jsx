import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project06() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 06</h1>
            </div>
        </div>
    )
}
