<?php

namespace App\Http\Controllers;

use App\Models\Title;
use Illuminate\Http\Request;

class TitleController extends Controller
{
    // ✅ GET: /api/titles
    public function index()
    {
        return response()->json(Title::all());
    }

    // ✅ POST: /api/titles
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'created_by' => 'nullable|string|max:200',
        ]);

        $title = Title::create($validated);
        return response()->json($title, 201);
    }

    // ✅ GET: /api/titles/{id}
    public function show($id)
    {
        $title = Title::find($id);
        if (!$title) return response()->json(['message' => 'Not found'], 404);
        return response()->json($title);
    }

    // ✅ PUT/PATCH: /api/titles/{id}
    public function update(Request $request, $id)
    {
        $title = Title::find($id);
        if (!$title) return response()->json(['message' => 'Not found'], 404);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'created_by' => 'nullable|string|max:200',
        ]);

        $title->update($validated);
        return response()->json($title);
    }

    // ✅ DELETE: /api/titles/{id}
    public function destroy($id)
    {
        $title = Title::find($id);
        if (!$title) return response()->json(['message' => 'Not found'], 404);

        $title->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
