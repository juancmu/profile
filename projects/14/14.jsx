import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project14() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 14</h1>
            </div>
        </div>
    )
}
