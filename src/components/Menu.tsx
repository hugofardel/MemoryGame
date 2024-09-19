import { NavLink } from "react-router-dom";

const Menu = () => {
    return (
        <nav className="menu">
            <ul>
                <li><NavLink to="/simon">Simon</NavLink></li>
                <li><NavLink to="/number-memory">Number memory</NavLink></li>
                <li><NavLink to="/verbal-memory">Verbal memory</NavLink></li>
            </ul>
        </nav>
    );
};

export default Menu;