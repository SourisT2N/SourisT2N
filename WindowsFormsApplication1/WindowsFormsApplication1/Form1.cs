using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApplication1
{
    public partial class Form1 : Form
    {
        private static List<KhachHang> dsKH = new List<KhachHang>();
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            DisplayGheNgoi();
        }
        private static int count = 0;
        private void DisplayGheNgoi()
        {
            for (int i = 0; i < Const._HEIGHT; i++)
            {
                for (int j = 0; j < Const._WIDTH; j++)
                {
                    count++;
                    Label btn = new Label();
                    btn.Width = btn.Height = 50;
                    btn.BackColor = Color.White;
                    btn.BorderStyle = BorderStyle.Fixed3D;
                    btn.TextAlign = ContentAlignment.MiddleCenter;
                    btn.Text = count + "";
                    btn.Location = new Point(j * btn.Width, i * btn.Height);
                    pnGhe.Controls.Add(btn);
                    btn.Click += btn_Click;
                }
            }
        }

        void btn_Click(object sender, EventArgs e)
        {
            Label btn = sender as Label;
            if (btn.BackColor == Color.White)
                btn.BackColor = Color.Green;
            else if (btn.BackColor == Color.Green)
                btn.BackColor = Color.White;
            else if (btn.BackColor == Color.Yellow)
                MessageBox.Show("Ghế Này Đã Có Người Đặt", "Thông Báo");
        }

        private void btnChon_Click(object sender, EventArgs e)
        {
            Form2 frm = new Form2();
            if (frm.ShowDialog() == DialogResult.OK)
            {
                xacNhanMua(frm);
                loadDSKH();
            }
        }

        private void loadDSKH()
        {
            lstTT.Items.Clear();
            foreach(KhachHang kh in dsKH)
                lstTT.Items.Add(kh);
        }

        private void xacNhanMua(Form2 frm)
        {
            KhachHang kh = new KhachHang();
            kh.TenKH = frm.txtKH.Text;
            kh.Phone = frm.txtPhone.Text;
            for (int i = 0; i < pnGhe.Controls.Count; i++)
            {
                Label lbl = pnGhe.Controls[i] as Label;
                if (lbl.BackColor == Color.Green)
                {
                    lbl.BackColor = Color.Yellow;
                    kh.Ghes.Add(int.Parse(lbl.Text));
                }
            }
            txtTongTien.Text = kh.TinhTien + "";
            dsKH.Add(kh);
        }

        private void btnHuy_Click(object sender, EventArgs e)
        {
            if (lstTT.SelectedIndices.Count > 0)
            {
                        foreach (int j in lstTT.SelectedIndices)
                        {
                            KhachHang kh = lstTT.Items[j] as KhachHang;
                            foreach (Label lbl in pnGhe.Controls)
                                for (int i = 0; i < kh.Ghes.Count; i++)
                                    if (lbl.Text == (kh.Ghes[i] + ""))
                                        lbl.BackColor = Color.White;
                            dsKH.RemoveAt(j);
                            lstTT.Items.RemoveAt(j);
                        }
            }
            else MessageBox.Show("Bạn Chưa Chọn Thông Tin Để Hủy","Thông Báo");
        }
    }
}
