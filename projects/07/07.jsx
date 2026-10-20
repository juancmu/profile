import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project07() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 07</h1>
            </div>
        </div>
    )
}
