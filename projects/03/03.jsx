import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project03() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 03</h1>
            </div>
        </div>
    )
}
