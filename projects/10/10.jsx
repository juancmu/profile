import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project10() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 10</h1>
            </div>
        </div>
    )
}
