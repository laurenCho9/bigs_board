import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// 메뉴 아이템 타입 정의
type MenuItem = {
  name: string;
  path: string;
  icon: string;
};

const menuItems: MenuItem[] = [
  { name: "컨텐츠 등록", path: "/board", icon: "✏️" },
  { name: "컨텐츠 관리", path: "/manage", icon: "⚙️" },
  { name: "카테고리 관리", path: "/category", icon: "📂" },
];

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      {/* 사이드바 토글 버튼 */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? "＜" : "＞"}
      </button>

      {/* 메뉴 목록 */}
      <nav className="menu">
        {menuItems.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            isActive={pathname === item.path}
            isSidebarOpen={isSidebarOpen}
            navigate={navigate}
          />
        ))}
      </nav>
    </div>
  );
};

// 🔹 `NavItem`의 props 타입 지정
type NavItemProps = {
  item: MenuItem;
  isActive: boolean;
  isSidebarOpen: boolean;
  navigate: (path: string) => void;
};

const NavItem = ({ item, isActive, isSidebarOpen, navigate }: NavItemProps) => {
  return (
    <button
      className={`menu-item ${isActive ? "active" : ""}`}
      onClick={() => navigate(item.path)}
    >
      <span className="icon">{item.icon}</span>
      {isSidebarOpen && <span className="text">{item.name}</span>}
    </button>
  );
};

export default Header;
