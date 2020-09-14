import React, {useState, useCallback, useEffect, useContext} from 'react'
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'
import moment from 'moment'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import {Staticlist} from '../pages/Staticlist'



export const Statisticpage = () => {
    const [pararpam, setParam] = useState({
        userid: JSON.parse(localStorage.getItem('userData'))
    })
    const [admin, setAdmin] = useState({
        perweek: 0,
        obshak: 0,
        pre: 0,
        preperweek: 0,
        colgame: 0
    })
    const [statika, setGamesa] = useState([])
    const {loading,request} = useHttp()
    const all = useCallback(async () => {
        try{
            
            const data = await request('/api/auth/static', 'POST', pararpam)
            setGamesa(data)
        }catch(e){
            console.log(statika)
        }
    }, [statika])
    useEffect(() => {
        all()
        getWeekstat()
    }, [all])
    const getWeekstat = () => {
        var income = 0
        var col = 0
        var pre = 0
        statika.map((game) => {
            if (game.week == moment().format('W')){
                income = income + game.pay
                col = col + 1
                pre = pre + game.prepay
            }
            setAdmin({...admin, colgame: col, obshak: income,preperweek: pre})
        }
        )
    }

    return(
            <div className='container'>
                <div className="col s12 m6">
                    <div className="card blue darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">Игр проведено за неделю: {admin.colgame}</span>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6">
                    <div className="card blue darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">Выручка за неделю: {admin.obshak}</span>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6">
                    <div className="card blue darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">Игр проведено за неделю: {admin.preperweek}</span>
                    </div>
                  </div>
                </div>
                <button className="navigator-menu blue btn waves-effect waves-light col s12" type="submit" name="action">
                Показать все игры
                </button>
                <Staticlist statika={statika}></Staticlist>
            </div>
        )

}