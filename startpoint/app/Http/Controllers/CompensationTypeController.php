<?php

namespace App\Http\Controllers;

use App\Models\CompensationType;
use Illuminate\Http\Request;

class CompensationTypeController extends Controller
{
    public function index()
    {
        return response()->json(CompensationType::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'created_by' => 'nullable|string|max:200',
        ]);

        $comp = CompensationType::create($validated);
        return response()->json($comp, 201);
    }

    public function show($id)
    {
        $comp = CompensationType::find($id);
        if (!$comp) return response()->json(['message' => 'Not found'], 404);
        return response()->json($comp);
    }

    public function update(Request $request, $id)
    {
        $comp = CompensationType::find($id);
        if (!$comp) return response()->json(['message' => 'Not found'], 404);

        $validated = $request->validate([
            'type' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'created_by' => 'nullable|string|max:200',
        ]);

        $comp->update($validated);
        return response()->json($comp);
    }

    public function destroy($id)
    {
        $comp = CompensationType::find($id);
        if (!$comp) return response()->json(['message' => 'Not found'], 404);

        $comp->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
