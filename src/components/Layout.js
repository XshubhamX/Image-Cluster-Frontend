import React from "react";
import { Link } from 'react-router-dom';

const layout = (props) => {
    return (
        <React.Fragment>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">KPMG Image Library</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarColor01">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <Link to="/images" className="nav-link">
                                    Images
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/illustrations" className="nav-link">
                                    Illustrations
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link disabled">
                                    Vectors
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/upload" className="nav-link" >
                                    Upload
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {props.children}
        </React.Fragment>
    )
};

export default layout;
