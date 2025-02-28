let patrimonioEditando = null; // Variável para armazenar o patrimônio em edição

// Função para cadastrar o patrimônio
function cadastrarPatrimonio() {
    const codigoBarras = document.getElementById('codigoBarras').value;
    const descricaoPatrimonio = document.getElementById('descricaoPatrimonio').value;
    const setor = document.getElementById('setor').value;
    const quantidade = document.getElementById('quantidade').value;
    const custoAquisicao = document.getElementById('custoAquisicao').value;
    const notaFiscal = document.getElementById('notaFiscal').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const serie = document.getElementById('serie').value;

    if (codigoBarras && descricaoPatrimonio && setor && quantidade && custoAquisicao && notaFiscal && marca && modelo && serie) {
        if (codigoBarras.length < 4) {
            alert("O código de barras deve ter no mínimo 4 dígitos.");
            return;
        }

        // Recupera os patrimônios já cadastrados ou inicializa um array vazio
        const patrimonios = JSON.parse(localStorage.getItem('patrimonios')) || [];

        // Verifica se o código de barras já existe (exceto se estiver editando)
        if (!patrimonioEditando) {
            const patrimonioExistente = patrimonios.find(patrimonio => patrimonio.codigo === codigoBarras);
            if (patrimonioExistente) {
                alert("Código de barras já cadastrado!");
                return;
            }
        }

        // Cria o objeto do patrimônio
        const patrimonio = {
            codigo: codigoBarras,
            descricao: descricaoPatrimonio,
            setor: setor,
            quantidade: quantidade,
            custoAquisicao: custoAquisicao,
            notaFiscal: notaFiscal,
            marca: marca,
            modelo: modelo,
            serie: serie
        };

        if (patrimonioEditando) {
            // Atualiza o patrimônio existente
            const index = patrimonios.findIndex(p => p.codigo === patrimonioEditando.codigo);
            patrimonios[index] = patrimonio;
            patrimonioEditando = null; // Limpa a edição
            document.getElementById('btnSalvarAlteracao').style.display = 'none';
        } else {
            // Adiciona o novo patrimônio
            patrimonios.push(patrimonio);
        }

        localStorage.setItem('patrimonios', JSON.stringify(patrimonios));
        alert("Patrimônio salvo com sucesso!");
        limparCampos();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para salvar a alteração
function salvarAlteracao() {
    cadastrarPatrimonio(); // Reutiliza a função de cadastro para salvar a alteração
}

// Função para pesquisar o patrimônio
function pesquisarPatrimonio() {
    const codigoBarras = document.getElementById('codigoBarras').value;
    const patrimonios = JSON.parse(localStorage.getItem('patrimonios')) || [];

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (codigoBarras) {
        const patrimonioEncontrado = patrimonios.find(patrimonio => patrimonio.codigo === codigoBarras);

        if (patrimonioEncontrado) {
            resultadoDiv.innerHTML = `
                <p><strong>Código de Barras:</strong> ${patrimonioEncontrado.codigo}</p>
                <p><strong>Descrição:</strong> ${patrimonioEncontrado.descricao}</p>
                <p><strong>Setor:</strong> ${patrimonioEncontrado.setor}</p>
                <p><strong>Quantidade:</strong> ${patrimonioEncontrado.quantidade}</p>
                <p><strong>Custo de Aquisição:</strong> ${patrimonioEncontrado.custoAquisicao}</p>
                <p><strong>Nota Fiscal:</strong> ${patrimonioEncontrado.notaFiscal}</p>
                <p><strong>Marca:</strong> ${patrimonioEncontrado.marca}</p>
                <p><strong>Modelo:</strong> ${patrimonioEncontrado.modelo}</p>
                <p><strong>Série:</strong> ${patrimonioEncontrado.serie}</p>
                <div class="acoes">
                    <button type="button" id="btnExcluir" onclick="excluirPatrimonio('${patrimonioEncontrado.codigo}')">Excluir</button>
                    <button type="button" id="btnAlterar" onclick="carregarParaEdicao('${patrimonioEncontrado.codigo}')">Editar</button>
                </div>
            `;
        } else {
            resultadoDiv.innerHTML = "<p>Patrimônio não encontrado.</p>";
        }
    } else {
        resultadoDiv.innerHTML = "<p>Por favor, insira o código de barras para pesquisar.</p>";
    }
}

// Função para excluir um patrimônio
function excluirPatrimonio(codigo) {
    const patrimonios = JSON.parse(localStorage.getItem('patrimonios')) || [];
    const novosPatrimonios = patrimonios.filter(patrimonio => patrimonio.codigo !== codigo);
    localStorage.setItem('patrimonios', JSON.stringify(novosPatrimonios));
    alert("Patrimônio excluído com sucesso!");
    pesquisarPatrimonio(); // Atualiza a exibição
}

// Função para carregar patrimônio para edição
function carregarParaEdicao(codigo) {
    const patrimonios = JSON.parse(localStorage.getItem('patrimonios')) || [];
    patrimonioEditando = patrimonios.find(patrimonio => patrimonio.codigo === codigo);

    if (patrimonioEditando) {
        document.getElementById('codigoBarras').value = patrimonioEditando.codigo;
        document.getElementById('descricaoPatrimonio').value = patrimonioEditando.descricao;
        document.getElementById('setor').value = patrimonioEditando.setor;
        document.getElementById('quantidade').value = patrimonioEditando.quantidade;
        document.getElementById('custoAquisicao').value = patrimonioEditando.custoAquisicao;
        document.getElementById('notaFiscal').value = patrimonioEditando.notaFiscal;
        document.getElementById('marca').value = patrimonioEditando.marca;
        document.getElementById('modelo').value = patrimonioEditando.modelo;
        document.getElementById('serie').value = patrimonioEditando.serie;

        document.getElementById('btnSalvarAlteracao').style.display = 'block';
    }
}

// Função para gerar relatório geral de todos os patrimônios cadastrados
function gerarRelatorio() {
    const patrimonios = JSON.parse(localStorage.getItem('patrimonios')) || [];
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (patrimonios.length > 0) {
        let relatorio = "<h3>Relatório Geral de Patrimônios Cadastrados:</h3>";
        patrimonios.forEach(patrimonio => {
            relatorio += `
                <div class="printable">
                    <p><strong>Código de Barras:</strong> ${patrimonio.codigo}</p>
                    <p><strong>Descrição:</strong> ${patrimonio.descricao}</p>
                    <p><strong>Setor:</strong> ${patrimonio.setor}</p>
                    <p><strong>Quantidade:</strong> ${patrimonio.quantidade}</p>
                    <p><strong>Custo de Aquisição:</strong> ${patrimonio.custoAquisicao}</p>
                    <p><strong>Nota Fiscal:</strong> ${patrimonio.notaFiscal}</p>
                    <p><strong>Marca:</strong> ${patrimonio.marca}</p>
                    <p><strong>Modelo:</strong> ${patrimonio.modelo}</p>
                    <p><strong>Série:</strong> ${patrimonio.serie}</p>
                    <hr>
                </div>
            `;
        });
        resultadoDiv.innerHTML = relatorio;
    } else {
        resultadoDiv.innerHTML = "<p>Nenhum patrimônio cadastrado.</p>";
    }
}

// Função para gerar relatório filtrado por setor
function gerarRelatorioPorSetor() {
    const setorPesquisado = document.getElementById('pesquisaSetor').value.trim().toLowerCase();
    const patrimonios = JSON.parse(localStorage.getItem('patrimonios')) || [];
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (setorPesquisado) {
        const patrimoniosFiltrados = patrimonios.filter(patrimonio => patrimonio.setor.toLowerCase() === setorPesquisado);

        if (patrimoniosFiltrados.length > 0) {
            let relatorio = `<h3>Relatório de Patrimônios no Setor: ${setorPesquisado}</h3>`;
            patrimoniosFiltrados.forEach(patrimonio => {
                relatorio += `
                    <div class="printable">
                        <p><strong>Código de Barras:</strong> ${patrimonio.codigo}</p>
                        <p><strong>Descrição:</strong> ${patrimonio.descricao}</p>
                        <p><strong>Setor:</strong> ${patrimonio.setor}</p>
                        <p><strong>Quantidade:</strong> ${patrimonio.quantidade}</p>
                        <p><strong>Custo de Aquisição:</strong> ${patrimonio.custoAquisicao}</p>
                        <p><strong>Nota Fiscal:</strong> ${patrimonio.notaFiscal}</p>
                        <p><strong>Marca:</strong> ${patrimonio.marca}</p>
                        <p><strong>Modelo:</strong> ${patrimonio.modelo}</p>
                        <p><strong>Série:</strong> ${patrimonio.serie}</p>
                        <hr>
                    </div>
                `;
            });
            resultadoDiv.innerHTML = relatorio;
        } else {
            resultadoDiv.innerHTML = `<p>Nenhum patrimônio encontrado no setor: ${setorPesquisado}.</p>`;
        }
    } else {
        resultadoDiv.innerHTML = "<p>Por favor, insira um setor para pesquisar.</p>";
    }
}

// Função para imprimir o relatório
function imprimirRelatorio() {
    const resultadoDiv = document.getElementById('resultado').innerHTML;
    if (resultadoDiv.includes("Nenhum patrimônio cadastrado")) {
        alert("Nenhum patrimônio cadastrado para imprimir.");
        return;
    }

    const janelaImpressao = window.open('', '', 'width=800,height=600');
    janelaImpressao.document.write(`
        <html>
            <head>
                <title>Relatório de Patrimônios</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    h3 { color: #007bff; }
                    p { margin: 5px 0; }
                    hr { border: 0; border-top: 1px solid #ccc; margin: 10px 0; }
                </style>
            </head>
            <body>
                ${resultadoDiv}
            </body>
        </html>
    `);
    janelaImpressao.document.close();
    janelaImpressao.print();
}

// Função para fazer backup dos dados em um arquivo .txt
function fazerBackup() {
    const patrimonios = JSON.parse(localStorage.getItem('patrimonios')) || [];
    if (patrimonios.length === 0) {
        alert("Nenhum patrimônio cadastrado para fazer backup.");
        return;
    }

    const dados = JSON.stringify(patrimonios, null, 2);
    const blob = new Blob([dados], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'backup_patrimonios.txt';
    link.click();
    URL.revokeObjectURL(url);
    alert("Backup realizado com sucesso!");
}

// Função para importar backup de um arquivo .txt
function importarBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    input.onchange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const dados = JSON.parse(e.target.result);
                localStorage.setItem('patrimonios', JSON.stringify(dados));
                alert("Backup importado com sucesso!");
                gerarRelatorio(); // Atualiza o relatório após a importação
            } catch (error) {
                alert("Erro ao importar backup. Verifique o arquivo.");
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// Função para limpar os campos do formulário
function limparCampos() {
    document.getElementById('codigoBarras').value = '';
    document.getElementById('descricaoPatrimonio').value = '';
    document.getElementById('setor').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('custoAquisicao').value = '';
    document.getElementById('notaFiscal').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('serie').value = '';
}