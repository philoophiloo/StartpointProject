<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::all();
        return response()->json($departments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'department_head' => 'required|string|max:150',
             'description' => 'required|string|max:150',
             'created_by' => 'required|string|max:150',

        ]);

        $department = Department::create($validated);

        return response()->json(['message' => 'Department created', 'data' => $department], 201);
    }

    public function show(string $id)
    {
        $department = Department::findOrFail($id);
        return response()->json($department);
    }

    public function showMultiple(Request $request)
    {
        $ids = explode(',', $request->query('ids'));
        $ids = array_filter($ids, fn($id) => is_numeric($id));
        $departments = Department::whereIn('id', $ids)->get();

        return response()->json($departments);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'department_head' => 'sometimes|string|max:150',
            'description' => 'nullable|string',
            'created_by'=>'sometimes|string|max:150',
            'is_active' => 'boolean',
        ]);

        $department = Department::findOrFail($id);
        $department->update($validated);

        return response()->json(['message' => 'Department updated', 'data' => $department]);
    }

    public function destroy(string $id)
    {
        $department = Department::findOrFail($id);
        $department->delete();

        return response()->json(['message' => 'Department deleted']);
    }
}
