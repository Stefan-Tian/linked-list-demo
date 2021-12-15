const itemClasses =
  "block px-4 py-2 mt-2 text-lg font-semibold text-gray-300 bg-transparent rounded-lg hover:text-gray-900 focus:text-blue-900 focus:outline-none focus:shadow-outline";

const Header = () => {
  return (
    <div className="text-gray-600 flex justify-center mb-24">
      <nav className="flex items-baseline px-4 pb-4">
        <div className="px-4 py-4 text-2xl font-bold mr-16">
          DOUBLY LINKED LIST
        </div>
        <a className={itemClasses} href="#">
          PUSH
        </a>
        <a className={itemClasses} href="#">
          UNSHIFT
        </a>
        <a className={itemClasses} href="#">
          INSERT
        </a>
        <a className={itemClasses} href="#">
          POP
        </a>
        <a className={itemClasses} href="#">
          SHIFT
        </a>
        <a className={itemClasses} href="#">
          DELETE
        </a>
      </nav>
    </div>
  );
};

export default Header;
