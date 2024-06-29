import "react-spinners"
import { ScaleLoader } from "react-spinners"

export default function Spinner() {
    return (
        <div className="spinner">
            <ScaleLoader color="red" loading={true} size={150} />
        </div>
    )
}
