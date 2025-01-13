
import HyperText  from "./ui/hyper-text"
interface HeadingProp {
    text: string;
  }

const Heading: React.FC<HeadingProp> = ({ text }) => {
    return (
        <div className="relative mt-5 mb-5 h-20 rounded-lg w-full bg-background overflow-hidden">
        <div className="relative z-10 flex items-center justify-center h-full">
            <HyperText startOnView={true} className="text-4xl md:text-6xl font-bold text-primary uppercase">{text}</HyperText>
        </div>
    </div>

    )
}

export default Heading;