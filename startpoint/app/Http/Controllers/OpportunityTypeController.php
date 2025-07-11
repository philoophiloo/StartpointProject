<?php

namespace App\Http\Controllers;

use App\Models\OpportunityType;
use Illuminate\Http\Request;

class OpportunityTypeController extends Controller
{
    public function index()
    {
        return response()->json(OpportunityType::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'created_by' => 'nullable|string|max:200',
        ]);

        $opportunityType = OpportunityType::create($validated);
        return response()->json($opportunityType, 201);
    }

    public function show($id)
    {
        $opportunityType = OpportunityType::find($id);
        if (!$opportunityType) {
            return response()->json(['message' => 'Not found'], 404);
        }
        return response()->json($opportunityType);
    }

    public function update(Request $request, $id)
    {
        $opportunityType = OpportunityType::find($id);
        if (!$opportunityType) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $validated = $request->validate([
            'type' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'created_by' => 'nullable|string|max:200',
        ]);

        $opportunityType->update($validated);
        return response()->json($opportunityType);
    }

    public function destroy($id)
    {
        $opportunityType = OpportunityType::find($id);
        if (!$opportunityType) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $opportunityType->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
