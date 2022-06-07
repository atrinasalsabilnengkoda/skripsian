import { Switch, Route, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './apps/admin/pages/Dashboard';
import DataSiswa from './apps/admin/pages/DataSiswa';
import DataGuru from './apps/admin/pages/DataGuru';
import DataToko from './apps/admin/pages/DataToko';
import DataTugas from './apps/admin/pages/DataTugas';
import DetailTugas from './apps/admin/pages/DetailTugas';
import TambahSoal from './apps/admin/pages/TambahSoal';
import EditSoal from './apps/admin/pages/EditSoal';
import Login from 'pages/Login';
import Page404 from 'pages/Page404';
import Blank from 'pages/Blank';
import Home from './apps/client/pages/Home';
import ProfilSiswa from './apps/client/pages/Profil';
import Toko from './apps/client/pages/Toko';
import Tugas from './apps/client/pages/Tugas';
import Game1 from './apps/client/pages/Game1';
import Game2 from './apps/client/pages/Game2';
import Game3 from './apps/client/pages/Game3';
import Game4 from './apps/client/pages/Game4';

// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';
import AuthService from 'services/auth.service';

function App() {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect (() => {
        const user = AuthService.getCurrentUser();

        if(user) {
            console.log(user);
            setCurrentUser(user);
        }
    }, []);

    const routesAdmin = [
        {
            path: '/dashboard',
            component: Dashboard
        },
        {
            path: '/dataSiswa',
            component: DataSiswa
        },
        {
            path: '/dataGuru',
            component: DataGuru
        },
        {
            path: '/dataToko',
            component: DataToko
        },
        {
            path: '/dataTugas',
            component: DataTugas
        },
        {
            path: '/detailtugas/:uid',
            component: DetailTugas,
        },
        {
            path: '/tambahsoal/:uid',
            component: TambahSoal,
        },
        {
            path: '/editsoal/:uid',
            component: EditSoal,
        },
        {
            path: '/404',
            component: Page404,
        },
        {
            path: '/blank',
            component: Blank,
        },
    ];

    const routesClient = [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/profilSiswa',
            component: ProfilSiswa
        },
        {
            path: '/toko',
            component: Toko
        },
        {
            path: '/tugas',
            component: Tugas
        },
        {
            path: '/game1',
            component: Game1
        },
        {
            path: '/game2',
            component: Game2
        },
        {
            path: '/game3',
            component: Game3
        },
        {
            path: '/game4',
            component: Game4
        },
    ];

    return (
        <>
            {/* <Sidebar />
            <div className="md:ml-64" />
            <div> */}
                <Switch>
                    <Route exact path="/" component={Login} />

                    { currentUser && (currentUser.role === "1" ) &&
                    routesAdmin.map((route, i) => {
                        return (
                            <Route
                            key={i}
                            path={route.path}
                            component={route.component}
                            />
                        )
                    })};

                    { currentUser && (currentUser.role === "2" ) &&
                    routesClient.map((route, i) => {
                        return (
                            <Route
                            key={i}
                            path={route.path}
                            component={route.component}
                            />
                        )
                    })};
                    <Redirect from="*" to="/" />
                </Switch>
                {/* <Footer />
            </div> */}
        </>
    );
}

export default App;
