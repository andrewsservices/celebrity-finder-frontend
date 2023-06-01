import {useState} from 'react';
import LoadingBox from '../LoadingBox/LoadingBox';


function Register({loadUser,onRouteChange,emptyFields,setEmptyFields}){

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onNameChange = (event) => {
        setName(event.target.value)
    }

    const onSubmitSignin = () => {
        if(email && password && name){
            setIsLoading(true)
        } else {
            setEmptyFields()
        }
        fetch('https://pure-wildwood-43456.herokuapp.com/register',{
            method:'post',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                email,
                password,
                name
            })
        })
        .then(response=>response.json())
        .then(user=>{
            if(user.id){
                setIsLoading(false)
                loadUser(user)
                onRouteChange('home')
            }
        })

    }


    return(
        isLoading
        ?
        <LoadingBox/>
        :
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input
                        onChange={onNameChange}
                        className={emptyFields ? "pa2 input-reset ba b--red bg-transparent hover-bg-black hover-white w-100" : "pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"}
                        type="text" name="name"  id="name"/>
                    {
                        emptyFields
                        ?
                        <p className="red mt1 db fw6 lh-copy f6">Form cannot be blank</p>
                        :
                        ""
                    }
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input
                        onChange={onEmailChange}
                        className={emptyFields ? "pa2 input-reset ba b--red bg-transparent hover-bg-black hover-white w-100" : "pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"}
                        type="email" name="email-address"  id="email-address"/>
                        {
                        emptyFields
                        ?
                        <p className="red mt1 db fw6 lh-copy f6">Form cannot be blank</p>
                        :
                        ""
                    }
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input
                        onChange={onPasswordChange}
                        className={emptyFields ? "pa2 input-reset ba b--red bg-transparent hover-bg-black hover-white w-100" : "pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"}
                        type="password" name="password"  id="password"/>
                        {
                        emptyFields
                        ?
                        <p className="red mt1 db fw6 lh-copy f6">Form cannot be blank</p>
                        :
                        ""
                    }
                </div>

                </fieldset>
                <div className="">
                <input
                    onClick={onSubmitSignin}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>

                </div>
                <div className="lh-copy mt3">


                </div>
            </div>
            </main>

        </article>
    )
}




export default Register;