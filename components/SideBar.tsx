import { links, logo, navLinks } from "@/utils/data";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import Button from "./Button";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const SideBar = () => {
  const [show, setShow] = useState(false);
  return (
    <aside className="p-4 w-full fixed top-0 flex justify-between items-center z-50 backdrop-blur-md border-b border-white/20">
      <div>
        <h2 className="font-bold">{logo}</h2>
      </div>
      {show ? (
        <button
          onClick={() => setShow(false)}
          className="fixed top-0 left-0 w-screen h-screen bg-black/10 z-40"
        ></button>
      ) : null}
      {show ? (
        <div className="fixed top-0 right-0 h-screen w-40 bg-black z-50">
          <MdOutlineCancel
            className="absolute top-4 right-4 shadow-[0_2px_0_#fff0f0] cursor-pointer rounded-full active:translate-y-1 active:shadow-none transition-all duration-150"
            onClick={() => setShow(false)}
            size="20"
          />
          <div className="mt-16 flex flex-col">
            {navLinks.map((el, index) => (
              <a
                href={el.link}
                key={index}
                className="py-2 mx-auto border-b border-white/40 cursor-pointer w-full text-center"
              >
                {el.title}
              </a>
            ))}
            <div className="space-x-2 mt-4 px-2">
              <Button className="bg-emerald-800" link={links.github}>
                <FaGithub />
              </Button>
              <Button className="bg-blue-800" link={links.linkedin}>
                <FaLinkedin />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <GiHamburgerMenu
          className="cursor-pointer"
          onClick={() => setShow(true)}
          size="20"
        />
      )}
    </aside>
  );
};

export default SideBar;
