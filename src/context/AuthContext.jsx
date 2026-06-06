import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const STORAGE_KEY = "arya_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Orders stored per user in localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem("arya_orders");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Saved addresses stored per user
  const [addresses, setAddresses] = useState(() => {
    try {
      const stored = localStorage.getItem("arya_addresses");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  useEffect(() => {
    localStorage.setItem("arya_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("arya_addresses", JSON.stringify(addresses));
  }, [addresses]);

  // Email/password register
  const register = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("arya_users") || "[]");
    if (users.find((u) => u.email === email)) {
      return { error: "An account with this email already exists." };
    }
    const newUser = { id: Date.now(), name, email, password, avatar: null, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem("arya_users", JSON.stringify(users));
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    return { success: true };
  };

  // Email/password login
  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("arya_users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { error: "Invalid email or password." };
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    return { success: true };
  };

  // Google login
  const loginWithGoogle = (googleUser) => {
    const { sub, name, email, picture } = googleUser;
    const users = JSON.parse(localStorage.getItem("arya_users") || "[]");
    let found = users.find((u) => u.googleId === sub || u.email === email);
    if (!found) {
      found = { id: Date.now(), name, email, googleId: sub, avatar: picture, createdAt: new Date().toISOString() };
      users.push(found);
      localStorage.setItem("arya_users", JSON.stringify(users));
    }
    setUser({ id: found.id, name: found.name, email: found.email, avatar: found.avatar || picture, googleId: sub });
    return { success: true };
  };

  const logout = () => setUser(null);

  // Update profile name
  const updateProfile = ({ name }) => {
    setUser((prev) => ({ ...prev, name }));
    const users = JSON.parse(localStorage.getItem("arya_users") || "[]");
    const updated = users.map((u) => u.id === user.id ? { ...u, name } : u);
    localStorage.setItem("arya_users", JSON.stringify(updated));
  };

  // Add order
  const addOrder = (order) => {
    const newOrder = { ...order, id: Date.now(), userId: user?.id, placedAt: new Date().toISOString(), status: "Confirmed" };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  // Address management
  const addAddress = (addr) => {
    const newAddr = { ...addr, id: Date.now() };
    setAddresses((prev) => [...prev, newAddr]);
    return newAddr;
  };
  const removeAddress = (id) => setAddresses((prev) => prev.filter((a) => a.id !== id));

  const userOrders = orders.filter((o) => o.userId === user?.id);

  return (
    <AuthContext.Provider value={{ user, login, register, loginWithGoogle, logout, updateProfile, orders: userOrders, addOrder, addresses, addAddress, removeAddress }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
