<?php

use Illuminate\Support\Facades\Route;
use App\Models\Department;
use Illuminate\Http\Request;

Route::get('/home', function () {
    return view ('home');
});
Route::get('/about', function () {
    return view ('about');
});
Route::get('/contact', function () {
    return view ('contact');
});
Route::get('/create', function (Request $request) {
    $departments = Department::all();

    // If ?edit=ID is passed, fetch the department to edit
    $editDepartment = null;
    if ($request->has('edit')) {
        $editDepartment = Department::find($request->query('edit'));
    }

    return view('create', compact('departments', 'editDepartment'));
});

// ✅ Correct: Create should be POST, not PUT
Route::post('/departments', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'department_head' => 'required|string|max:255',
        'description' => 'required|string|max:150',
        'created_by' => 'required|string|max:150',
    ]);

    Department::create($request->only(['name', 'department_head', 'description', 'created_by']));
    return redirect('/')->with('success', 'Department created!');
});

// ✅ Correct: Update should be PUT
Route::put('/departments/{id}', function (Request $request, $id) {
    $request->validate([
        'name' => 'required|string|max:255',
        'department_head' => 'required|string|max:255',
        'description' => 'required|string|max:150',
        'created_by' => 'required|string|max:150',
    ]);

    $department = Department::findOrFail($id);
    $department->update($request->only(['name', 'department_head', 'description', 'created_by']));
    return redirect('/')->with('success', 'Department updated!');
});

// ✅ Correct: Delete
Route::delete('/departments/{id}', function ($id) {
    $department = Department::findOrFail($id);
    $department->delete();
    return redirect('/')->with('success', 'Department deleted!');
});
