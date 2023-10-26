import './style.less'
import { useState, useEffect } from 'react'
import { EditCampo } from '../../components/EditCampo'
import { ButtonOutline } from '../../components/ButtonOutline'
import {Link, useNavigate} from 'react-router-dom'
import {usernameAtom, idAtom} from '../../states'
import { useAtom } from 'jotai'
import axios from 'axios'
export function EditarPerfil({classe = '', aoClicarRetangulo, aoClicarCancelar}){
    const [nome, setNome] = useState('')
    const [username, setUsername] = useState('')
    const [genero, setGenero] = useState('')
    const [sexualidade, setSexualidade] = useState('')
    const [pronome, setPronome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [usernameAtomValue, setUsernameAtomValue] = useAtom(usernameAtom)
    const [idAtomValue, setIdAtomValue] = useAtom(idAtom)
    const [ultimoUsuario, setUltimoUsuario] = useState({})
    const navigate = useNavigate()

    function alterarPerfil(e){
        e.preventDefault()
        
        console.log(usernameAtomValue)
        console.log(idAtomValue)
        axios({
            method: "get",
            url: `https://api-3wfy.onrender.com/api/todostec/selecionar/username/${usernameAtomValue}`
        })
        .then((promisse) => {
            console.log(promisse.data)  
            setUltimoUsuario({
                ncdusuario: promisse.data.ncdusuario, 
                cnome: nome != '' ? nome : promisse.data.cnome ,
                cusername: username != '' ? username : promisse.data.cusername ,
                csenha: promisse.data.csenha,
                ctelefone: promisse.data.ctelefone,
                cemail: promisse.data.cemail,
                ncontaativa: promisse.data.ncontaativa,
                ncdpronome: pronome != '' ? pronome : promisse.data.ncdpronome ,
                ncdgenero: genero != '' ? genero : promisse.data.ncdgenero ,
                ncdsexualidade: sexualidade != '' ? sexualidade : promisse.data.ncdsexualidade ,
                cdescricao: descricao != '' ? descricao : promisse.data.cdescricao,
                clinksite: 'null',
                clinkfoto: 'null'
            })
        })
        .catch((error) => {
            console.log(error)
        })
        console.log(ultimoUsuario)
        axios({
            method: "put",
            url: `https://api-3wfy.onrender.com/api/todostec/atualizar/${idAtomValue}`,
            data: {
                ultimoUsuario
            }
        })  
        // console.log(perfilNovo)

        setNome('')
        setUsername('')
        setGenero('')
        setSexualidade('')
        setPronome('')
        setDescricao('')

    }

    useEffect(() => {
        if(localStorage.getItem('status') === 'deslogado'){
            navigate('/login')
        } else if(localStorage.getItem('status') === 'logado'){

        } else{
            navigate('/login')
        }
}, [])
    useEffect(() => {
        if(usernameAtomValue === '' || idAtomValue === ''){
            localStorage.setItem('status', 'deslogado')
            navigate('/login')
        }
    }, [])
    return(
        <div className={classe + " EditarPerfil"}>
            <div className="container">
                <div className="top">
                    <div className="retangulo" onClick={aoClicarRetangulo}></div>
                    <div className="fotoDePerfil">
                        <div className="foto"></div>
                        <p>Trocar foto de Perfil</p>
                    </div>
                </div>
                <form className="infoPerfil" onSubmit={alterarPerfil}>
                    <EditCampo valor={nome} 
                    setValor={setNome} 
                    texto='Nome' 
                    tipo='text'
                    requiredInput = {true}
                    
                    />
                    <EditCampo valor={username} 
                    setValor={setUsername} 
                    texto='Username' 
                    tipo='text'
                    
                    />
                    <EditCampo valor={genero} 
                    setValor={setGenero} 
                    texto='Gênero' 
                    tipo='text'
                    
                    />
                    <EditCampo valor={sexualidade} 
                    setValor={setSexualidade} 
                    texto='Sexualidade' 
                    tipo='text'
                    
                    />
                    <EditCampo valor={pronome} 
                    setValor={setPronome} 
                    texto='Pronome' 
                    tipo='text'
                    
                    />
                    <EditCampo valor={descricao} 
                    setValor={setDescricao} 
                    texto='Descrição' 
                    tipo='text'
                    
                    />
                    <div className="buttons">
                        <ButtonOutline text='Definir' tipo='submit'/>
                        <Link to='/perfil'>
                            <ButtonOutline text='Cancelar' classe='cancelar' aoClicar={aoClicarCancelar}/>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

