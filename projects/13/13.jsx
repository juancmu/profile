import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project13() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 13</h1>
            </div>
        </div>
    )
}
