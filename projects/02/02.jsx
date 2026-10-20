import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project02() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 02</h1>
            </div>
        </div>
    )
}
