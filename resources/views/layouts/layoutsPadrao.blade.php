<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <link rel="stylesheet" href="{{asset('css/categoriasCSS/categoria.css')}}">
    <meta name="csrf-token" content="{{csrf_token()}}">

    <title>Document</title>
</head>
<body>
    
    <div class="container" style="padding-top: 4px;">

        @component('componentes.header')
            
        @endcomponent
        
        @hasSection ('body')
        
            @yield('body')
            
        @endif
    

        @component('componentes.footer')
            @yield('footer')
        @endcomponent
    </div>

    {{-- <script src="{{asset('js/app.js')}}"></script> --}}

</body>
</html>