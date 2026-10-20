import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project19() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 19</h1>
            </div>
        </div>
    )
}
