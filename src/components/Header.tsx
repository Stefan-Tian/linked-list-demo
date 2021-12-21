import { NavLink } from 'react-router-dom';

const itemClasses =
  'block px-4 py-2 mt-2 text-lg font-semibold bg-transparent rounded-lg hover:text-gray-900 focus:text-blue-900 focus:outline-none focus:shadow-outline ';

const Header = () => {
  return (
    <div className="text-gray-600 flex justify-center mb-24">
      <nav className="flex items-baseline px-4 pb-4">
        <div className="px-4 py-4 text-2xl font-bold mr-16">
          DOUBLY LINKED LIST
        </div>
        <NavLink
          className={({ isActive }) =>
            itemClasses + (isActive ? 'text-blue-900' : 'text-gray-500')
          }
          to="/push"
        >
          PUSH
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            itemClasses + (isActive ? 'text-blue-900' : 'text-gray-500')
          }
          to="/unshift"
        >
          UNSHIFT
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            itemClasses + (isActive ? 'text-blue-900' : 'text-gray-500')
          }
          to="/insert"
        >
          INSERT
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            itemClasses + (isActive ? 'text-blue-900' : 'text-gray-500')
          }
          to="/pop"
        >
          POP
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            itemClasses + (isActive ? 'text-blue-900' : 'text-gray-500')
          }
          to="/shift"
        >
          SHIFT
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            itemClasses + (isActive ? 'text-blue-900' : 'text-gray-500')
          }
          to="/delete"
        >
          DELETE
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            itemClasses + (isActive ? 'text-blue-900' : 'text-gray-500')
          }
          to="/lru-cache"
        >
          LRU Cache
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            itemClasses + (isActive ? 'text-blue-900' : 'text-gray-500')
          }
          to="/lfu-cache"
        >
          LFU Cache
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
