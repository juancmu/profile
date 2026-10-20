import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project16() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 16</h1>
            </div>
        </div>
    )
}
