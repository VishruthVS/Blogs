import { Link } from "react-router-dom"
import Dropdown from "../components/Dropdown"
import  {FirstComponent}  from "../components/Sections/FirstComponent"
import { SecComponent } from "../components/Sections/SecComponent"
import { ThirdComponent } from "../components/Sections/ThirdComponent"
import { FourthComponent } from "../components/Sections/FourthComponent"
import { FifthComponent } from "../components/Sections/FifthComponent"

export const Home = () => {
    return (
        <div>
            <header className="flex justify-between items-center py-4 px-8">
                <div className="font-serif font-semibold text-[30px] lg:text-[44px] hover:italic pl-3">
                    <Link to="/">Medium</Link>
                </div>
                <div className="font-serif font-medium text-lg pr-3">
                <Link to={'/signin'} >
                    Log in ~
                </Link>
                </div>
            </header>
            <div className="flex justify-between items-center bg-sky-50 py-4 px-8">
                <div className="font-lg text-gray-800">
                    CATEGORIES
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-400 px-2 py-1 rounded-md mr-2"
                    />
                    <button className="bg-blue-600 text-white px-4 py-1 rounded-md">Search</button>
                </div>
                <Dropdown />
            </div>
            <div>
                <FirstComponent />
                <SecComponent/>
                <ThirdComponent/>
                <FourthComponent/>
                <FifthComponent />
            </div>
        </div>
    )
}