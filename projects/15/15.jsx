import { useProjectStyle } from '../../src/hooks/useProjectStyle'

export default function Project15() {
    const heroStyle = useProjectStyle()

    return (
        <div style={heroStyle}>
            <div className="container">
                <h1>Project 15</h1>
            </div>
        </div>
    )
}
