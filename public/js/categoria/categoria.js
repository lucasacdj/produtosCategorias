$(document).ready(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    function cadastrarNovaCategoria() {

        Categoria = {
            nome : $("#nomeDaCategoria").val()
        }        
        
        $.post("categoria", Categoria,function (categorias) {
            
            var recebeCategorias = JSON.parse(categorias);

            if (recebeCategorias == false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Já existe uma categoria com esse nome !',
                  })

                $('#ExemploModalCentralizado').modal('hide');
                
            } else {
                if ($("#verificaSeJaExisteTabela").val() == 1) {
                var recebeNumeroTotalDeCategorias = $("#contadorCategorias").val();
                
                var atualizaTotalDeCategorias = parseInt(recebeNumeroTotalDeCategorias) + 1;

                $("#contadorCategorias").val(atualizaTotalDeCategorias);

                var recebeNovaCategoria = `
                        <tr id = "tableBody${recebeCategorias.id}">
                            <th scope="row">${recebeCategorias.id}</th>
                            <td>${recebeCategorias.nome}</td>
                            <td>
                                <button onclick = "editarCategoria(${recebeCategorias.id})"  class = "btn btn-primary">Editar</button>
                                <button onclick = "excluir(${recebeCategorias.id})" class = "btn btn-danger">Excluir</button>
                            </td>
                        </tr>`
                $("#colunasTabelaCategorias").append(recebeNovaCategoria);
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Categoria salva com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })

                $('#ExemploModalCentralizado').modal('hide');

                } else {

                    var recebeNumeroTotalDeCategorias = $("#contadorCategorias").val();
                
                    var atualizaTotalDeCategorias = parseInt(recebeNumeroTotalDeCategorias) + 1;

                    $("#contadorCategorias").val(atualizaTotalDeCategorias);

                    $("#categoriasRetorno").html('');
                    $("#verificaSeJaExisteTabela").val(1);    
                    var recebeRetorno = `
                        <table class="table table-striped">
                            <thead>
        
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Ações</th>
                                </tr>
        
                            </thead>
        
                            <tbody id = "colunasTabelaCategorias">
                    
                                <tr id = "tableBody${recebeCategorias.id}">
                                    <th scope="row">${recebeCategorias.id}</th>
                                    <td>${recebeCategorias.nome}</td>
                                    <td>
                                        <button onclick = "editarCategoria(${recebeCategorias.id})"  class = "btn btn-primary">Editar</button>
                                        <button onclick = "excluir(${recebeCategorias.id})" class = "btn btn-danger">Excluir</button>
                                    </td>
        
                                </tr>

                            </tbody>
        
                        </table>
                    `
                    $("#categoriasRetorno").append(recebeRetorno);
                    
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Categoria salva com sucesso',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })

                    $('#ExemploModalCentralizado').modal('hide');
                }
            }

            


            },
            
        );
        

    }

    $("#novaCategoria").submit(function (e) { 
        
        event.preventDefault();

        if ($("#validarEdicao").val() == 0) {
            
            cadastrarNovaCategoria();

        } else {
            
            atualizarCategoria($("#validarEdicao").val());
        }
        

    });

    function listarCategoriasJs() {
        
        $.getJSON("categoriasJs", function (categorias) {

            var recebeCategorias = categorias;
            
            $("#contadorCategorias").val(recebeCategorias.length)
            
            var tableCategoriaHeader;

            var tableCategoriaBody = [];

            var tableCategoria =  '';

            var tableFooter;

            if (recebeCategorias.length > 0 ) {
                $("#verificaSeJaExisteTabela").val(1)
                tableCategoriaHeader = `
                        <table id = 'listaDeCategorias' class="table table-striped" style = "text-align : center">
                            <thead>

                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Ações</th>
                                </tr>

                            </thead>
                            <tbody id = "colunasTabelaCategorias">
                            `
                
                tableCategoria += tableCategoriaHeader;

                for (let contador = 0; contador < recebeCategorias.length; contador++) {

                    tableCategoriaBody[contador] = `
                            <tr id = "tableBody${recebeCategorias[contador].id}">
                                <th scope="row">${recebeCategorias[contador].id}</th>
                                <td id = "nomeDaCategoria${recebeCategorias[contador].id}">${recebeCategorias[contador].nome}</td>
                                <td>

                                    <button onclick = "editarCategoria(${recebeCategorias[contador].id})"  class = "btn btn-primary">Editar</button>
                                    <button onclick = "excluir(${recebeCategorias[contador].id})" class = "btn btn-danger">Excluir</button>
                                
                                </td>
                                
                            </tr>`
                    
                }

                tableCategoriaBody.forEach(function (conteudoBody){
                    
                    tableCategoria += conteudoBody

                });

                tableFooter = `</tbody></table>`;

                tableCategoria += tableFooter;

                $("#categoriasRetorno").append(tableCategoria);

            } else{
                
                var semCategoriasInformada = `
                    <div id="main">
                    
                        <div class="fof">
                            <h1>Error 404</h1>
                            <h3>Nenhuma categoria encontrada !</h3>
                        </div>

                    </div>`


                $("#categoriasRetorno").append(semCategoriasInformada);
            }
            

        });

    }


    $(function () {
        
        listarCategoriasJs();

    })


})  

function atualizarCategoria(idCategoria) {
    
    var recebeIdCategoria = idCategoria;
    
    Categoria =  {
        id : recebeIdCategoria,
        nome : $("#nomeDaCategoria").val()
    }
    
    $.ajax({
        type: "PUT",
        url: "categoria/"+recebeIdCategoria,
        data: Categoria,
        dataType:"json",
        success: function (response) {
            var recebeNovaCategoria = response;
            
            if (recebeNovaCategoria == false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Já existe uma categoria com esse nome !',
                })

                $('#ExemploModalCentralizado').modal('hide');

            } else {
                
                $("#nomeDaCategoria"+recebeIdCategoria).html(recebeNovaCategoria.nome)
                
            }


        }
    });

}

function editarCategoria(idCategoria) {
        
    recebeIdCategoria = idCategoria;

    $.getJSON("categoria/"+recebeIdCategoria,function (categoria) {
            
            var recebeCategoria = categoria;
        
            $("#validarEdicao").val(recebeIdCategoria);
            $("#ExemploModalCentralizado").modal('show');
            
            $("#nomeDaCategoria").val(recebeCategoria.nome)

        }
    );

}

function verificaSeExisteMaisCategorias() {
    
    var recebeNumeroTotalDeCategorias = $("#contadorCategorias").val();

    var totalAtualDeCategorias = parseInt(recebeNumeroTotalDeCategorias) - 1;

    $("#contadorCategorias").val(totalAtualDeCategorias);

    if(totalAtualDeCategorias >= 1) {
        
        return true;

    } else{
        $("#categoriasRetorno").html('');
        
        var semCategoriasInformada = `
            <div id="main">
            
                <div class="fof">
                    <h1>Error 404</h1>
                    <h3>Nenhuma categoria encontrada !</h3>
                </div>

            </div>`


        $("#categoriasRetorno").append(semCategoriasInformada);
    }

}

function excluir(idCategoria) {
    var recebeIdCategoria = idCategoria;

    Swal.fire({
        title: 'Você realmente quer deletar essa categoria ?',
        text: "Não haverá retorno após isso !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, delete isto !',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "delete",
                url: "categoria/"+recebeIdCategoria,
                dataType: "json",
                success: function () {
                    $("#tableBody"+recebeIdCategoria).remove();
                    verificaSeExisteMaisCategorias();
                }
            });

            Swal.fire(
                'Deletado!',
                'Categoria deletada com sucesso !',
                'success'
            )
        }
    })

}

function controlarCriterioDeEdicao() {
    $("#validarEdicao").val(0);
    $("#nomeDaCategoria").val('');
}