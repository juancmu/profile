import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project18() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 18</h1>
            </div>
        </div>
    )
}
