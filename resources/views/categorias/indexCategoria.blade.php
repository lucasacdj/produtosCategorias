@extends('layouts.layoutsPadrao')

@section('header')
    
@endsection

@section('body')
    
    <div id="categoriasRetorno">
        
    </div>

    <hr>

    <button onclick="controlarCriterioDeEdicao()" type="button" class="btn btn-primary" data-toggle="modal" data-target="#ExemploModalCentralizado">
        Nova Categoria
    </button>

    <div class="modal fade" id="ExemploModalCentralizado" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <input type="hidden" id="validarEdicao">
            <input type="hidden" id="verificaSeJaExisteTabela" value="false">
            <input type="hidden" id="contadorCategorias">
            <div class="modal-header">
                <h5 class="modal-title" id="TituloModalCentralizado">Cadastre uma categoria</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>

            <div class="modal-body">
                <form id="novaCategoria" name="novaCategoria" >
                    
                    <div class="form-group">
                        <label for="nomeDaCategoria">Por favor informe o nome da categoria </label>
                        <input type="text" class="form-control" id="nomeDaCategoria" name="nomeDaCategoria" placeholder="Eletro">
                    </div>

                    <button type="submit" class="btn btn-primary">Salvar</button>

                </form>
            </div>
            
        </div>
    </div>
    

@endsection

<script src="{{asset('js/app.js')}}"></script>
<script src="{{asset('js/categoria/categoria.js')}}"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

@section('footer')


@endsection