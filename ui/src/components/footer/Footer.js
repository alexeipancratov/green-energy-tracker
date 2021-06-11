import "./Footer.css";
import { IoIosPaper } from "react-icons/io";
import { AiOutlineCopyright, AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="d-flex flex-row justify-content-between">
      <div className="d-flex">
        <a href="https://rapchan-1.gitbook.io/green-energy-tracker/">
          <IoIosPaper /> Documentation
        </a>
        <a href="https://github.com/alexeipancratov/green-energy-tracker">
          <AiFillGithub /> Project repository
        </a>
      </div>
      <div className="d-flex flex-column justify-content-center">
        <span>
          <AiOutlineCopyright /> Green Energy Token 2021
        </span>
      </div>
    </footer>
  );
};

export default Footer;
