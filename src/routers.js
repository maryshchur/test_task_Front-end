import React, {lazy, Suspense, Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AllUsersView from "./components/allUsersView";
import Header from "./components/header";


class Routers extends Component {

    render() {
        return (
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Header/>
                    <Routes>
                        <Route path="/allUsers" element={<AllUsersView/>}/>
                        <Route
                            path="*"
                            element={
                                <main style={{padding: "1rem"}}>
                                    <p>There's nothing here!</p>
                                </main>
                            }
                        />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        );
    }
}

export default Routers;