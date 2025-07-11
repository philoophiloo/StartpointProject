<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use Illuminate\Http\Request;

class OpportunityController extends Controller
{
    public function index()
    {
        return response()->json(Opportunity::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'opportunity_type' => 'nullable|string|max:255',
            'opportunity_description' => 'nullable|string',
            'core_competencies' => 'nullable|string',
            'compensation_type' => 'nullable|string|max:255',
            'compensation_currency' => 'nullable|string|max:255',
            'compensation_amount' => 'required|numeric',
            'expiry_date' => 'required|date',
            'is_active' => 'boolean',
            'created_by' => 'nullable|string|max:200',
        ]);

        $opportunity = Opportunity::create($validated);
        return response()->json($opportunity, 201);
    }

    public function show($id)
    {
        $opportunity = Opportunity::find($id);
        if (!$opportunity) return response()->json(['message' => 'Not found'], 404);

        return response()->json($opportunity);
    }

    public function update(Request $request, $id)
    {
        $opportunity = Opportunity::find($id);
        if (!$opportunity) return response()->json(['message' => 'Not found'], 404);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'department' => 'sometimes|string|max:255',
            'opportunity_type' => 'nullable|string|max:255',
            'opportunity_description' => 'nullable|string',
            'core_competencies' => 'nullable|string',
            'compensation_type' => 'nullable|string|max:255',
            'compensation_currency' => 'nullable|string|max:255',
            'compensation_amount' => 'sometimes|numeric',
            'expiry_date' => 'sometimes|date',
            'is_active' => 'boolean',
            'created_by' => 'nullable|string|max:200',
        ]);

        $opportunity->update($validated);
        return response()->json($opportunity);
    }

    public function destroy($id)
    {
        $opportunity = Opportunity::find($id);
        if (!$opportunity) return response()->json(['message' => 'Not found'], 404);

        $opportunity->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
