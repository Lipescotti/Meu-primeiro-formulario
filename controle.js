const formulario = document.getElementById('formulario');
const nome = document.getElementById('nome');
const email = document.getElementById('email');

const botao = document.querySelector('button[type = "submit"]');


nome.addEventListener('blur', () => validarCampo(nome,validarNome));
email.addEventListener('blur', () => validarCampo(email, validarEmail));

nome.addEventListener('input', atualizarBotao);
email.addEventListener('input', atualizarBotao);


function validarCampo(input, funcaoValidadora)
{
    const msgErro = document.getElementById(input.id+'-erro');
    const resultado = funcaoValidadora(input.value);

    if (!resultado.valido)
        {
            input.classList.add('error');
            input.classList.remove('success');

            msgErro.classList.add('erro-msg');
            msgErro.classList.remove('certo-msg');
            msgErro.textContent = resultado.mensagem;
            return false;
        }
        else
        {
            input.classList.remove('error');
            input.classList.add('success');

            
            msgErro.classList.remove('erro-msg');
            msgErro.classList.add('certo-msg');
            msgErro.textContent = resultado.mensagem;
            return true;
        }
}


// Validações especificas
function validarNome(valor)
    {
        if (!valor.trim()) 
        {
            return {
                valido: false,
                mensagem: 'Nome é obrigatório'
            };
        }
        if (valor.length < 3)
        {
            return {
                valido: false,
                mensagem: 'Mínimo 3 caracteres'
            };
        }

        return {
            valido: true,
            mensagem: 'Nome OK'
        };
    }


    function validarEmail(valor)
    {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!valor) 
        {
            return {
                valido: false,
                mensagem: 'E-mail é obrigatório'
            };
        }

        if (!regex.test(valor)) 
        {
            return {
                valido: false,
                mensagem: 'Formato inválido\n@email.com é nescessario'
            };
        }

        return {
            valido: true,
            mensagem: 'Email OK'
        };

    }


    //Botão//

    
function atualizarBotao()
{
    const nomeValido = validarCampo(nome, validarNome);
    const emailValido = validarCampo(email, validarEmail);

    botao.disabled = !(nomeValido && emailValido);
}



 formulario.addEventListener('submit', function(e) 
{
    e.preventDefault();

    const nomeValido = validarCampo(nome, validarNome);
    const emailValido = validarCampo(email, validarEmail);


    if (nomeValido && emailValido)
    {
        alert('Furmulário enviado com sucesso!');


        formulario.reset();

        nome.classList.remove('error', 'success');
        email.classList.remove('error', 'success');

        
        document.getElementById('nome-erro').textContent = '';
        document.getElementById('email-erro').textContent = '';

        
        botao.disabled = true;
    }
 });