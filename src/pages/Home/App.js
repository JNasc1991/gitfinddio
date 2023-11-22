import './App.css';
import Header from "../../components/Header";
import background from "../../assets/background.png";
import ItemList from "../../components/ItemList";
import {useState} from "react";

function App() {
    const [user, setUser] = useState("")
    const [currentUser, setCurrentUser] = useState(null)
    const [repos, setRepos] = useState(null)

    const getDataUser = async () => {
        console.info("AQUI")
        console.info(user)
        const userData = await fetch(`https://api.github.com/users/${user}`)
        const {avatar_url, name,bio, login} = await userData.json()
        console.info({avatar_url, name,bio, login})
        if(name) {
            setCurrentUser({avatar_url, name,bio, login})
            const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
            const newRepos = await reposData.json()
            if (newRepos.length) {
                setRepos(newRepos)
            }
        }
        console.info(currentUser)
    }

console.info("user",user)
console.info("repos",repos)
  return (
    <div className="app">
       <Header/>
        <div className={"app--content"}>
            <img src={background} className={"app--content--background"} alt={"background app"} />
            <div className={"app--content--info"}>
                <div>
                    <input name={"user"}
                           placeholder={"@username"}
                           onChange={event => setUser(event.target.value)}
                    />
                    <button onClick={getDataUser}>
                        Buscar
                    </button>
                </div>
                {currentUser?.name ? (
                    <>
                <div className={"app--content--profile"}>
                    <img src={currentUser.avatar_url}
                         className={"app--content--profile--img"}
                         alt={"profile"}
                    />
                    <div>
                        <h3>{currentUser.name}</h3>
                        <span>{currentUser.login}</span>
                        <p>{currentUser.bio}</p>
                    </div>
                </div>
                <hr />
                        {repos?.length ? (
                <div>

                    <h4 className={"app--content--repositories"}>Repositórios</h4>
                    {repos.map((repo) =>
                        <ItemList
                    title={repo.name}
                    link={repo.html_url}
                    description={repo.description}
                    />
                    )}
                </div>
                        ) : ""
                    }
                    </>
        ) : ""}
            </div>
        </div>
    </div>
  );
}

export default App;
