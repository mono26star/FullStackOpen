import Part from './Part'

const Content = ({parts}) => {
    const total = parts.reduce((s, p) => {
        return s + p.exercises
    }, 0)
    
    return (
    <>
        {parts.map(part => <Part key={part.id} part={part} />)}
        <strong>total of {total} exercises</strong>
    </>
    )
}

export default Content