import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project22() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 22</h1>
            </div>
        </div>
    )
}
