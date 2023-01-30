
from odoo import http
from odoo.http import request


class EmpresasJohan(http.Controller):
    @http.route('/api/getAll', auth='public',type="json",csrf=True, cors='*')
    def list(self, **kw):
        empresas_johan_rec = request.env['empresas_johan.empresas_johan'].sudo().search([])
        empresas_johan = []
        for rec in empresas_johan_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
                'description': rec.description,
                'email': rec.email,
                'phone': rec.phone,
                'address': rec.address,
                'income': rec.income,
                'bill': rec.bill,
            }
            empresas_johan.append(vals)
            print ("GET ALL ----> ", empresas_johan)
        return {'status': 200, 'response': empresas_johan, 'message': 'Success'}
    
    @http.route('/api/get/<int:rec_id>', auth='public',type="json",csrf=True, cors='*')
    def listOne(self, rec_id):
        model_to_get = request.env['empresas_johan.empresas_johan']
        rec = model_to_get.browse(rec_id).sudo().ensure_one()
        val = {
                'id': rec.id,
                'name': rec.name,
                'description': rec.description,
                'email': rec.email,
                'phone': rec.phone,
                'address': rec.address,
                'income': rec.income,
                'bill': rec.bill,
        }
        data = {'status': 200, 'response': val, 'message': 'Success'}
        return data
    
    @http.route('/api/findByName', type="json", auth="public", csrf=True, cors='*')
    def findByName(self, **kw):
        data = kw["data"]
        reg_exp = '%' + data['name'] + '%'
        empresas_johan_rec = request.env['empresas_johan.empresas_johan'].sudo().search([('name', '=ilike', reg_exp)])
        empresas_johan = []
        for rec in empresas_johan_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
                'description': rec.description,
                'email': rec.email,
                'phone': rec.phone,
                'address': rec.address,
                'income': rec.income,
                'bill': rec.bill,
            }
            empresas_johan.append(vals)
        return {'status': 200, 'response': empresas_johan, 'message': 'Success'}
    

    @http.route('/api/create', type='json', auth='public', csrf=True, cors='*')
    def create(self, **kw):
        data = kw["data"]
        company_to_post = request.env["empresas_johan.empresas_johan"]
        record = company_to_post.sudo().create(data)
        return record.id
    
    @http.route('/api/update/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def update(self, rec_id, **kw):
        data = kw["data"]
        company_to_put = request.env["empresas_johan.empresas_johan"]
        rec = company_to_put.browse(rec_id).sudo().ensure_one()
        record = rec.write(data)
        data = {'status': 200, 'response': record, 'message': 'Success'}
        return data

    @http.route('/api/remove/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def delete(self, rec_id):
        company_to_del_rec = request.env["empresas_johan.empresas_johan"]
        rec = company_to_del_rec.browse(rec_id).sudo().ensure_one()
        is_deleted = rec.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data

    @http.route('/api/removeAll', type='json', auth='public', csrf=True, cors='*')
    def deleteAll(self):
        company_to_del = request.env["empresas_johan.empresas_johan"].sudo()
        
        # .with_context(active_test=False) to also find inactive records.
        all_companies = company_to_del.with_context(active_test=False).search([])
        is_deleted = all_companies.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data
    

