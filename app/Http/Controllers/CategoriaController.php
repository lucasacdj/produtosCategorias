<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Categorias;


class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){

        return view('categorias.indexCategoria');        
        
    }

    public function indexJs(){
        
        $Categorias = Categorias::all();
        
        return $Categorias->toJson();

    }

    public function indexCategoriaJson(){
        $Categorias = Categorias::all();
        
        return $Categorias->toJson();

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(){
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        
        $Categorias = new Categorias();

        $verificarSeExiste = DB::table('categorias')->where('nome', '=', $request->input('nome'))->get();

        if (count($verificarSeExiste) > 0) {
            
            return 'false';
        } else {
            
            $Categorias->nome = $request->input('nome');
            $Categorias->save();
            return $Categorias->toJson();

        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id){
        $Categoria = Categorias::find($id);
        
        return $Categoria->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id){
        
        $Categoria = Categorias::find($id);

        if (asset($Categoria)) {
            
            $verificarSeExiste = DB::table('categorias')
            ->where('nome', '=', $request->input('nome'))
            ->get();
            
            if (count($verificarSeExiste) > 0) {
            
                return 'false';
            } else {
                
                $Categoria->nome = $request->input('nome');
                $Categoria->save();
    
                return json_encode($Categoria);
    
            }

            
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        $Categoria = Categorias::find($id);

        if (isset($Categoria)) {
            $Categoria->delete();

            return $Categoria->toJson();
        }
    }
}
