import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const userRole = localStorage.getItem("userRole") === "true"
  console.log(userRole)
  function handleLogout() {
    alert("Logged out successfully")
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg px-4">
      <Link className="navbar-brand" to="/">MyApp</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">

          {
            token ? (
              !userRole ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">Cart</Link>
                  </li>
                  <li className="nav-item">
                    <button type="button" className="btn btn-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/addProducts">Add Product</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/viewProductStats">Product Stats</Link>
                  </li>
                  <li className="nav-item">
                    <button type="button" className="btn btn-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              )
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )
          }

        </ul>
      </div>
    </nav>
  )
}