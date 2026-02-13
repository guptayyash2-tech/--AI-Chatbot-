import { Link } from "react-router";

const Home = () => {
    return(
        <>
        <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Sign Up</Link>
        <Link to="/chatpage" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Go to Chat</Link>
        </>

    )
}
export default Home;