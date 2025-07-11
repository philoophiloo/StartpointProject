<!DOCTYPE html>
<html>
<head>
    <title>{{ isset($editDepartment) ? 'Edit Department' : 'Create Department' }}</title>
</head>
<body>
    <nav>
             <a href = "/home">Home </a>
            <a href = "/about">About </a>
            <a href = "/contact">Contact </a>
             <a href = "/">Create </a>
            
</nav>
    <h1>{{ isset($editDepartment) ? 'Edit Department' : 'Create a Department' }}</h1>

    {{-- Success message --}}
    @if(session('success'))
        <p style="color: green">{{ session('success') }}</p>
    @endif

    {{-- Show validation errors --}}
    @if($errors->any())
        <div style="color: red">
            @foreach($errors->all() as $error)
                <p>{{ $error }}</p>
            @endforeach
        </div>
    @endif

    <form method="PUT" action="{{ isset($editDepartment) ? url('/departments/' . $editDepartment->id) : url('/departments') }}">
        @csrf

        <label for="name">Department Name:</label>
        <input type="text" name="name" value="{{ old('name', $editDepartment->name ?? '') }}" required><br><br>

        <label for="department_head">Department Head:</label>
        <input type="text" name="department_head" value="{{ old('department_head', $editDepartment->department_head ?? '') }}" required><br><br>

        <label for="description">Description:</label>
        <input type="text" name="description" value="{{ old('description', $editDepartment->description ?? '') }}" required><br><br>

        <label for="created_by">Created By:</label>
        <input type="text" name="created_by" value="{{ old('created_by', $editDepartment->created_by ?? '') }}" required><br><br>

        <button type="submit">{{ isset($editDepartment) ? 'Update' : 'Save' }}</button>
    </form>

    <hr>
    <!-- <h2>Departments List</h2>
    @foreach($departments as $dept)
        <p>
            {{ $dept->name }} - {{ $dept->department_head }}
            <a href="/?edit={{ $dept->id }}">Edit</a>
        </p>
    @endforeach -->
    <!-- <h2>Departments List</h2>
@foreach($departments as $dept)
    <p>
        {{ $dept->name }} - {{ $dept->department_head }}
       <a href="/?edit={{ $dept->id }}">Edit</a>


        <form method="PUT" action="/departments/{{ $dept->id }}" style="display: inline" onsubmit="return confirm('Are you sure you want to delete this department?');">
            @csrf
            @method('DELETE')
            <button type="submit" style="color: red">Delete</button>
        </form>
    </p>
@endforeach -->

</body>
</html>
